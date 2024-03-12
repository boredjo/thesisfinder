from datetime import datetime

def log_error(e):
    print(f'[{datetime.now().strftime("%H:%M:%S")}] ERROR: This is an error')