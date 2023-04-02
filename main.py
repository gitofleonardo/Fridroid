import PySimpleGUI as sg
import main_window
import js_bridge as bridge

process = "com.google.android.apps.nexuslauncher"


def on_dump_view_tree_message(message, data):
    if message['type'] == 'send':
        msg = "{0}".format(message['payload'])
        dump_file(msg, "decor_dump.json")


def dump_file(msg, file_name):
    f = open(file_name, "w")
    f.write(msg)
    f.close()


bridge.execute_js("js/dump_view_tree.js", process, on_dump_view_tree_message)

window = sg.Window("Fridroid", main_window.layout, resizable=True)

while True:
    event, values = window.read(timeout=20)
    if event == 'Exit' or event == sg.WIN_CLOSED:
        break

window.close()
