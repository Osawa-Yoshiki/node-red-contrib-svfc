node-red-contrib-svfc
==================

A <a href="http://nodered.org" target="_new">Node-RED</a> node to print PDF/Excel/DirectPrint using SVF Cloud.

Install
-------

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-svfc


it uses <a href="https://github.com/rfrench/poster"> poster</a> node package

Usage
-----

    SVF Cloudを用いてPDFなどで印刷をするノードです。</p>
    <p>パラメータは次の通りです。</p>
    <ul>
    	<li><code>Type</code> : PDF or EXCEL or Direct Print(必須)</li>
    	<li><code>PrinterID</code> : <code>Type</code>でDirect Printを選択した場合は必須です。</li>
    	<li><code>Layout on SVF Cloud</code> : SVF Cloud上の様式ファイルのパスを指定します。(必須)</li>
    	<li><code>CSV Local Path</code> : node-redを実行しているコンピュータ上にあるCSVファイルを絶対パスで指定します。(必須)</li>
    	<li><code>PDF Title Name (Optional)</code> : PDFのプロパティのタイトルに表示される名称を指定します。(オプション)</li>
    	<li><code>PDF Password (Optional)</code> : PDFの閲覧パスワードを指定します。(オプション)</li>
    	<li><code>PDF Owner Password (Optional)</code> : PDFのオーナーパスワードを指定します。(オプション)</li>
    	<li><code>Name</code> : 本ノードの名称を指定します。処理には影響しません。(オプション)</li>
    </ul>
    <p><code>CSV Local Path</code>については、画面で設定する代わりに、msg.filenameでの指定が可能です。msg.filenameでの指定は画面の設定よりも優先されます。</p>
    <p>csvはカンマ区切りで1行目は必ずヘッダ項目を付加してください。</p>

