import hashlib
import sys
import json

def change_case(char):
    if char.isalpha():
        return char if (ord(char)-ord('a')) % 2 else char.upper()
    return char

def calculate_hash(master_key, site_name, password_length):
    password = hashlib.sha512(master_key + site_name).hexdigest()[:password_length]
    return "".join([change_case(c) for c in password])


if __name__ == "__main__":
    if len(sys.argv) == 3:
        master_key = sys.argv[1]
        site_name = sys.argv[2]
    elif len(sys.argv) == 2:
        master_key = "a48271581"
        site_name = sys.argv[1]
    password_length = 16
    print calculate_hash(master_key, site_name, password_length)