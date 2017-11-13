# Streaming Server
import socket
import time
from random import randint
import json

HOST = ''
PORT = 50007

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen(1)

while True:
    conn, addr = s.accept()
    print 'Client connection accepted ', addr
    while True:
        try:
            # data = str(randint(0, 9))
            data = json.dumps([
                { "name": "HDFC", "value": randint(0, 9999) },
                { "name": "IDEA", "value": randint(0, 9999) },
                { "name": "AXIS", "value": randint(0, 9999) },
                { "name": "ONE", "value": randint(0, 9999) },
                { "name": "HELL", "value": randint(0, 9999) },
                { "name": "OKAY", "value": randint(0, 9999) },
                { "name": "REACT", "value": randint(0, 9999) },
                { "name": "BUDD", "value": randint(0, 9999) },
                { "name": "MUDD", "value": randint(0, 9999) },
                { "name": "OKEU", "value": randint(0, 9999) },
                { "name": "YHKS", "value": randint(0, 9999) },
                { "name": "IJSD", "value": randint(0, 9999) },
                { "name": "YYSAA", "value": randint(0, 9999) },
                { "name": "UUAS", "value": randint(0, 9999) },
                { "name": "INDI", "value": randint(0, 9999) },
                { "name": "ASJI", "value": randint(0, 9999) },
                { "name": "BUSI", "value": randint(0, 9999) },
                { "name": "OKERE", "value": randint(0, 9999) },
                { "name": "OKAS", "value": randint(0, 9999) },
                { "name": "ASWD", "value": randint(0, 9999) },
                { "name": "ASD", "value": randint(0, 9999) },
                { "name": "OISD", "value": randint(0, 9999) },
                { "name": "USCS", "value": randint(0, 9999) },
                { "name": "IJSDUW", "value": randint(0, 9999) },
                { "name": "OKSDU", "value": randint(0, 9999) },
                { "name": "OJSID", "value": randint(0, 9999) },
                { "name": "IJSDI", "value": randint(0, 9999) },
                { "name": "ASIA", "value": randint(0, 9999) },
                { "name": "OSDJI", "value": randint(0, 9999) },
                { "name": "SKD", "value": randint(0, 9999) },
                { "name": "ISDISD", "value": randint(0, 9999) },
                { "name": "OKIHUG", "value": randint(0, 9999) },
                { "name": "OKYG", "value": randint(0, 9999) },
                { "name": "YYHH", "value": randint(0, 9999) },
                { "name": "NNNN", "value": randint(0, 9999) },
                { "name": "YGTF", "value": randint(0, 9999) },
                { "name": "ABAB", "value": randint(0, 9999) },
                { "name": "OKSD", "value": randint(0, 9999) },
                { "name": "WEOI", "value": randint(0, 9999) },
                { "name": "OKWRE", "value": randint(0, 9999) },
                { "name": "OKYG", "value": randint(0, 9999) },
                { "name": "AAAA", "value": randint(0, 9999) },
                { "name": "IDBI", "value": randint(0, 9999) }
            ])

            print 'Server sent:', data
            conn.send(data)    
            time.sleep(1)
        except socket.error, msg:
            print 'Client connection closed', addr
            break

conn.close()
