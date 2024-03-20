import os
import sys

from utils.logs import log_error, log_info

def check_permissions(directory):
    try:
        # Check if Python can access the directory
        os.listdir(directory)
        
        # Check if Python can create a temporary file in the directory
        with open(os.path.join(directory, '.tempfile'), 'w') as temp_file:
            temp_file.write('test')
        
        # Check if Python can delete the temporary file
        os.remove(os.path.join(directory, '.tempfile'))
        return True
    except OSError as e:
        log_error(e, f'check for full permissons on {directory}')
        return False
    

def check_folder(directory):
    try:
        # Check if the folder exists
        if not os.path.exists(directory):
            # Create the folder if it doesn't exist
            os.makedirs(directory)
            log_info(f"Created directory {directory}", "check_permisson.py - check folder()")
            return True
        else:
            return check_permissions(directory)
    except OSError as e:
        log_error(e, f'check if {directory} exists')
        return False

def pre_check():
    if not check_permissions("../database"): sys.exit(1)
    if not check_folder("../database/idea_attachments"): sys.exit(1)
    if not check_folder("../database/profile_pics"): sys.exit(1)

    log_info("Permissons on Database folder are granted", "check_permissons.py")