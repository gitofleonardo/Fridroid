import frida
from pathlib import Path


def execute_js(file, process_name, message_callback):
    device = frida.get_usb_device()
    process = device.attach(process_name)
    script = process.create_script(Path(file).read_text())
    script.on('message', message_callback)
    script.load()
