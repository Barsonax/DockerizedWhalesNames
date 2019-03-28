FROM stefanscherer/node-windows

RUN npm install -g whales-names
COPY boot.cmd boot.cmd

COPY index.js "C:\nodejs\node_modules\whales-names\lib"

ENTRYPOINT [ "boot.cmd" ]