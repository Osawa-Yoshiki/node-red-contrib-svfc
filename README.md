# node-red-contrib-svfc

[Node-RED](http://nodered.org) Node to print PDF/Excel/DirectPrint using SVF Cloud.


## Install

Run the following command in the root directory of your Node-RED install:

````
    npm install node-red-contrib-svfc
````


## Usage

### Input
If you config before using this node, no need to set msg.payload, otherwise, you can also set local filepath of SVF formatted csv to msg.filepath, msg.filepath will read by node and send to SVF Cloud.


### Output
msg.payload will not be a array but buffer containing the file contents. If the case of Direct Print, msg.payload will only be response message.


### Sample flow
This flow uses a email node, it can send a PDF file created by SVF Cloud via Email.

````
[{"id":"72f6e65b.c93478","type":"svf cloud","z":"50bb5b03.f97c04","credential":"","printtype":"PDF","xml":"form/folder/example.xml","printerid":"","csv":"/home/ubuntu/invoice.csv","pdfTitle":"example","password":"","pdfPermPass":"","name":"","x":226,"y":156,"wires":[["8e18bfb3.d5516"]]},{"id":"5decae62.425a7","type":"inject","z":"50bb5b03.f97c04","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":117.99999237060547,"y":84.00002765655518,"wires":[["72f6e65b.c93478"]]},{"id":"8e18bfb3.d5516","type":"change","z":"50bb5b03.f97c04","name":"","rules":[{"t":"set","p":"attachments","pt":"msg","to":"payload","tot":"msg"},{"t":"set","p":"filename","pt":"msg","to":"example.pdf","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":364,"y":244,"wires":[["8eff85ba.a76188"]]},{"id":"8eff85ba.a76188","type":"e-mail","z":"50bb5b03.f97c04","server":"smtp.gmail.com","port":"465","secure":true,"name":"user@example.com","dname":"","x":604.0000114440918,"y":171.00001668930054,"wires":[]}]
````

## Copyright and license

Copyright 2017 IBM Corp. under the Apache 2.0 license.
