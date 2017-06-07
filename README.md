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

    SVF Cloud��p����PDF�Ȃǂň��������m�[�h�ł��B</p>
    <p>�p�����[�^�͎��̒ʂ�ł��B</p>
    <ul>
    	<li><code>Type</code> : PDF or EXCEL or Direct Print(�K�{)</li>
    	<li><code>PrinterID</code> : <code>Type</code>��Direct Print��I�������ꍇ�͕K�{�ł��B</li>
    	<li><code>Layout on SVF Cloud</code> : SVF Cloud��̗l���t�@�C���̃p�X���w�肵�܂��B(�K�{)</li>
    	<li><code>CSV Local Path</code> : node-red�����s���Ă���R���s���[�^��ɂ���CSV�t�@�C�����΃p�X�Ŏw�肵�܂��B(�K�{)</li>
    	<li><code>PDF Title Name (Optional)</code> : PDF�̃v���p�e�B�̃^�C�g���ɕ\������閼�̂��w�肵�܂��B(�I�v�V����)</li>
    	<li><code>PDF Password (Optional)</code> : PDF�̉{���p�X���[�h���w�肵�܂��B(�I�v�V����)</li>
    	<li><code>PDF Owner Password (Optional)</code> : PDF�̃I�[�i�[�p�X���[�h���w�肵�܂��B(�I�v�V����)</li>
    	<li><code>Name</code> : �{�m�[�h�̖��̂��w�肵�܂��B�����ɂ͉e�����܂���B(�I�v�V����)</li>
    </ul>
    <p><code>CSV Local Path</code>�ɂ��ẮA��ʂŐݒ肷�����ɁAmsg.filename�ł̎w�肪�\�ł��Bmsg.filename�ł̎w��͉�ʂ̐ݒ�����D�悳��܂��B</p>
    <p>csv�̓J���}��؂��1�s�ڂ͕K���w�b�_���ڂ�t�����Ă��������B</p>

