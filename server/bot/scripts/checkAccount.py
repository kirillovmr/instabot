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

answer = {
  'result': success
}

if(success):
  # Getting user info
  user_id = bot.get_user_id_from_username(args.u)
  user_info = bot.get_user_info(user_id)
  user = {}

  # user['username'] = args.u
  # user['password'] = args.p
  user['avatar'] = user_info['hd_profile_pic_versions'][0]['url']
  user['initial_stats'] = {
    'followers': user_info['follower_count'],
    'following': user_info['following_count'],
    'tags': user_info['usertags_count'],
    'medias': user_info['media_count']
  }
  user['current_stats'] = user['initial_stats']
  answer['user'] = user

print(json.dumps(answer))

# Clear temp folder
try:
  shutil.rmtree('../temp')
except:
  print('Error deleting temp folder.')