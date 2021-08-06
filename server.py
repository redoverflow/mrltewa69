import asyncio
import websockets
import requests

async def serv(websocket, path):
    async for message in websocket:
        packetrecv = message
        print("\n> received a request")
        if packetrecv.startswith("hey give me the funni level data from page"):
            print("> is valid, sending level data back")
            rawlevels = requests.get(f"https://gdbrowser.com/api/search/*?type=recent&page={packetrecv.split('.')[1]}&count=69")
            #print(rawlevels.content)
            levels = rawlevels.content.decode("utf-8")
            await websocket.send(levels.replace("length", "lvllength"))
            print("< sent")

start_server = websockets.serve(serv, "localhost", 8765)
asyncio.get_event_loop().run_until_complete(start_server)
print("> started")
asyncio.get_event_loop().run_forever()