import time
import json

i = 0
while(True):
  if i > 3: 
    exit(0)
  print(json.dumps('Hey {}'.format(i)))

  i += 1
  time.sleep(1)
