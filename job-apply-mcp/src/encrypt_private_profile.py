import sys
import json
from .storage import data_path, encrypt_private_profile

def main():
    input_path = data_path("private-profile.json")
    if not input_path.exists():
        sys.stderr.write("Create data/private-profile.json locally from the README template before encrypting it.\n")
        sys.exit(1)
    
    with open(input_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    encrypt_private_profile(data)
    input_path.unlink()
    print("Encrypted private-profile.json to private-profile.json.enc and removed plaintext.")

if __name__ == "__main__":
    main()
