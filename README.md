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


### Sample flow 1
This flow uses a email node, it can send a PDF file created by SVF Cloud via Email.

````
[{"id":"44f31900.ad52a8","type":"svf cloud","z":"38621e71.8c0c32","credential":"","printtype":"PDF","xml":"form/folder/example.xml","printerid":"","csv":"/home/ubuntu/invoice.csv","pdfTitle":"example","password":"","pdfPermPass":"","name":"","x":258,"y":189.99997234344482,"wires":[["93f621c6.19ea4"]]},{"id":"a4d21d44.485a1","type":"inject","z":"38621e71.8c0c32","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":149.99999237060547,"y":118,"wires":[["44f31900.ad52a8"]]},{"id":"93f621c6.19ea4","type":"e-mail","z":"38621e71.8c0c32","server":"smtp.gmail.com","port":"465","secure":true,"name":"user@example.com","dname":"","x":518.0000343322754,"y":182.99999237060547,"wires":[]}]
````

### Sample flow 2
This flow uses a dropbox node, it can send a PDF file created by SVF Cloud to Dropbox.

````
[{"id":"75633e83.1ff7d","type":"svf cloud","z":"9bafcc28.00874","credential":"","printtype":"PDF","xml":"form/folder/example.xml","printerid":"","csv":"/home/ubuntu/invoice.csv","pdfTitle":"example","password":"","pdfPermPass":"","name":"","x":338.00006103515625,"y":179.99997901916504,"wires":[["43027cba.d20f74"]]},{"id":"a3bc89ec.6bcfe8","type":"inject","z":"9bafcc28.00874","name":"","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":120,"y":96.00000762939453,"wires":[["75633e83.1ff7d"]]},{"id":"43027cba.d20f74","type":"dropbox out","z":"9bafcc28.00874","dropbox":"","filename":"","localFilename":"","name":"","x":583.1666870117188,"y":224.33334350585938,"wires":[]},{"id":"34496c9f.1e9b14","type":"svfc-config","z":"","clientid":"","secret":"","key":""}]
````