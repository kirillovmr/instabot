import os
import argparse
import json

# Parsing arguments
parser = argparse.ArgumentParser(add_help=True)
parser.add_argument('-u', help="username")
parser.add_argument('-p', help="password")
args = parser.parse_args()

# Changing user directory
dirname = '../users/{}'.format(args.u)
if not os.path.exists(dirname):
  os.makedirs(dirname)
os.chdir(dirname)

from instabot import Bot

bot = Bot()
bot.login(username=args.u, password=args.p)

# Getting user info
user_id = bot.get_user_id_from_username("kirillovmr")
user_info = bot.get_user_info(user_id)
user = {}

user['username'] = args.u
user['password'] = args.p
user['avatar'] = user_info['hd_profile_pic_versions'][0]['url']
user['initial_stats'] = {
  'followers': user_info['follower_count'],
  'following': user_info['following_count'],
  'tags': user_info['usertags_count'],
  'medias': user_info['media_count']
}

print(json.dumps(user))