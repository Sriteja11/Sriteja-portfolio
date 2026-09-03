import os
import json
import base64
import hmac
from pathlib import Path
from typing import Any, Dict, Optional
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT_DIR / "data"

def data_path(*parts: str) -> Path:
    return DATA_DIR.joinpath(*parts)

def read_json(file_name: str, fallback: Any = None) -> Any:
    path = data_path(file_name)
    if not path.exists():
        return fallback if fallback is not None else []
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return fallback if fallback is not None else []

def write_local_json(file_name: str, value: Any) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    path = data_path(file_name)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(value, f, indent=2)
        f.write("\n")
    try:
        os.chmod(path, 0o600)
    except Exception:
        pass

def _key_from_env() -> bytes:
    key_hex = os.getenv("PRIVATE_PROFILE_ENCRYPTION_KEY", "").strip()
    if len(key_hex) != 64:
        raise ValueError("PRIVATE_PROFILE_ENCRYPTION_KEY must be 64 hexadecimal characters.")
    return bytes.fromhex(key_hex)

def encrypt_private_profile(profile: Dict[str, Any]) -> None:
    key = _key_from_env()
    aesgcm = AESGCM(key)
    iv = os.urandom(12)
    data = json.dumps(profile).encode("utf-8")
    encrypted = aesgcm.encrypt(iv, data, None)
    # AESGCM in cryptography appends the 16-byte authentication tag to the ciphertext
    tag = encrypted[-16:]
    ciphertext = encrypted[:-16]

    payload = {
        "v": 1,
        "iv": base64.b64encode(iv).decode("utf-8"),
        "tag": base64.b64encode(tag).decode("utf-8"),
        "ciphertext": base64.b64encode(ciphertext).decode("utf-8"),
    }
    path = data_path("private-profile.json.enc")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(payload, f)
    try:
        os.chmod(path, 0o600)
    except Exception:
        pass

def read_private_profile(access_key: str) -> Dict[str, Any]:
    expected = os.getenv("PRIVATE_PROFILE_ACCESS_KEY", "").strip()
    if not expected or not access_key:
        raise PermissionError("Private profile access is not configured or authorized.")
    if not hmac.compare_digest(access_key.encode("utf-8"), expected.encode("utf-8")):
        raise PermissionError("Private profile access was denied.")

    path = data_path("private-profile.json.enc")
    if not path.exists():
        raise FileNotFoundError("No encrypted private profile exists. Run encrypt-profile after creating private-profile.json locally.")

    with open(path, "r", encoding="utf-8") as f:
        payload = json.load(f)

    iv = base64.b64decode(payload["iv"])
    tag = base64.b64decode(payload["tag"])
    ciphertext = base64.b64decode(payload["ciphertext"])
    encrypted = ciphertext + tag

    key = _key_from_env()
    aesgcm = AESGCM(key)
    decrypted = aesgcm.decrypt(iv, encrypted, None)
    return json.loads(decrypted.decode("utf-8"))
