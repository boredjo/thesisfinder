from datetime import datetime

# define colors
ENDC = '\033[0m'
GRAY = '\033[90m'
RED = '\033[91m'
GREEN = '\033[92m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
PURPLE = '\033[95m'
LIGHTBLUE = '\033[96m'

def log_error(e, location_in_code = 'unspecified'):
    print(f'{GRAY}[{datetime.now().strftime("%H:%M:%S")}]{RED} ERROR({type(e)}):{ENDC} {e} {GRAY}[location: {location_in_code}]{ENDC}')

def log_info(message, location_in_code = 'unspecified'):
    print(f'{GRAY}[{datetime.now().strftime("%H:%M:%S")}]{BLUE} INFO:{ENDC} {message} {GRAY}[location: {location_in_code}]{ENDC}') 

 