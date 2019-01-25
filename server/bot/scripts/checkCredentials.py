import os
import argparse
import json
import shutil     # remove folders

# Parsing arguments
parser = argparse.ArgumentParser(add_help=True)
parser.add_argument('-u', help="username")
parser.add_argument('-p', help="password")
args = parser.parse_args()

if not args.u or not args.p:
  exit(0)

# Chanding directory to temp
dirname = '../temp'
if not os.path.exists(dirname):
  os.makedirs(dirname)
os.chdir(dirname)

from instabot import Bot

bot = Bot()
success = bot.login(username=args.u, password=args.p)

print(json.dumps({
  'result': success
}))

# Clear temp folder
try:
  shutil.rmtree('../temp')
except:
  print('error')