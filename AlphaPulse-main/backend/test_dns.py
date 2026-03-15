import socket

hosts = [
    "db.pklsaazbdlhlecxfomsg.supabase.co",
    "db.pklsaazbdlhlecxfomsg.supabase.com",
    "pklsaazbdlhlecxfomsg.supabase.co",
    "pklsaazbdlhlecxfomsg.supabase.com",
]

for host in hosts:
    try:
        ip = socket.gethostbyname(host)
        print(f"{host} -> {ip}")
    except Exception as e:
        print(f"{host} -> failed: {e}")
