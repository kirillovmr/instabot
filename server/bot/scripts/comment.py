import time
import json

i = 0
while(True):
  if i > 20: 
    exit(0)
  print(json.dumps('Comment {}'.format(i)))

  i += 1
  time.sleep(1)
