import os
import argparse

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
user_id = bot.get_user_id_from_username("kirillovmr")
user_info = bot.get_user_info(user_id)
print(user_info['biography'])