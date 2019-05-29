<h4 align="center">  
<a href="https://xrpi.io" target="_blank"><img src="https://raw.githubusercontent.com/xrpinnovations/node-red-contrib-xrpl/master/images/logo.png" width="200"></a>  
<br>  
Redefining the future one integration at a time  
</h4>  

<h3 align="center">  
The XRP Ledger nodes for <a href="https://nodered.org/" target="_blank">Node-Red</a>
</h3>  

#### These nodes will allow you to:  
- Fully interact with the XRP Ledger directly from Node-Red.
  - Generate new XRP accounts
  - Get account transactions
  - Subscribe to account transactions
  - Get account information and settings
  - Send XRP with invoiceID, Memo and Destination Tag support!!!
  - Prepare custom transactions to set account settings such as domain and email fields.
  - Prepare, execute and cancel escrows!
  - Multisign!!!
  - Generate QR Codes for XRP Addresses

<img src="https://raw.githubusercontent.com/xrpinnovations/node-red-contrib-xrpl/master/images/xrpl_palette.png" align="right"/>

- Connect the XRP ledger to any Web API!!
- Setup regular XRP payments (think of standing orders or direct debits).
- Create custom digital wallets.  
- Create <a href="https://flows.nodered.org/node/node-red-dashboard">custom XRP Dashboards</a>.
- Use XRPL features to create and sign transactions <b>offline</b>!  
- Monitor XRP accounts and auto transfer from one to the other on certain conditions. (Think hot/cold wallets).
- Smart device integration!!!!! (<a href="https://node-red-alexa.io/">Alexa</a>, <a href="https://flows.nodered.org/node/node-red-contrib-googlehome">Google Home</a>, <a href="https://flows.nodered.org/node/node-red-contrib-generic-ble">Bluetooth Presence Detection</a>, <a href="https://flows.nodered.org/node/node-red-contrib-zigbee">Zigbee</a>, <a href="https://flows.nodered.org/node/node-red-contrib-openzwave">Zwave</a>).
  - Click a wireless smart button to send XRP.
  - Change the colour of your smart bulbs depending on your account balance.
  - Flash your bulbs when you receive a payment.
  - Have Alexa announce incoming transactions to your account (or anyone else's for the matter).
  - Have a dog with a GPS collar and pay for dog walking? Why not automate it, let node-red auto transfer XRP straight to the walker as soon as the dog checks back in at home. You could even calculate the payment based on distance travelled and time walked.
- Smart Home Integration!!!! (<a href="https://flows.nodered.org/node/node-red-contrib-home-assistant-websocket">Home Assistant</a>, Samsung SmartThings)
  - Display your XRP wallets on your smart home interfaces.
  - Combine incoming payments with smart home automations.
- Get notified anyway you want, email, MQTT, <a href="https://flows.nodered.org/node/node-red-contrib-push">google notifications</a>, <a href="https://flows.nodered.org/node/node-red-contrib-chatbot">telegram, pushbullet, FB messenger, slack,</a> <a href="https://flows.nodered.org/node/node-red-node-twitter">twitter</a>, <a href="https://flows.nodered.org/node/node-red-contrib-polly-tts">bluetooth speaker (via text to speech - Polly)</a>.
- Build a quick and easy Point of Sale system.
- Create XRP Bots on most if not all social media platforms.  
- Auto record transactions straight to <a href="https://flows.nodered.org/node/node-red-contrib-viseo-google-spreadsheet">google spreadsheets</a>.  
- Prototype apps quickly and easily using the XRP testnet.
- Insert imagination here...

Check out the <a href="https://flows.nodered.org/" target="_blank">extensive library of flows and nodes</a> shared by the community, you can get some real inspiration and create some awesome things.

Example flows will be added to this repo on a regular basis, in the meantime you can check out our <a href="quick_examples.md">quick examples here.</a> Share your flows and lets build something great together. Feel free to submit PRs.

#### Regular Payments Example
<img src="https://raw.githubusercontent.com/xrpinnovations/node-red-contrib-xrpl/master/images/regular_payments.png"/>

Tutorials will be added to the <a href="https://xrpi.io" target="_blank">blog on our site</a> once we're ready so stay tuned.

These nodes are still fresh off the keyboard and although a lot of time and effort has gone into testing there is still more testing assurance work to be done. Please test your flows on the testnet before using real zerps and allows be sensible in how you approach this.

#### Installation Instructions  
Node-Red can be <a href="https://nodered.org/docs/getting-started/" target="_blank">installed on pretty much anything</a>, from Raspberry Pis to Android Phones/Tablets, Windows PCs, Linux all the way up to cloud enterprise solutions.

Once you're up and running with Node-Red (see above link) then <a href="https://nodered.org/docs/getting-started/adding-nodes" target="_blank">it's simple to add these set of XRP nodes.</a>

To do this select Manage Palette from the menu (top right), and then select the install tab in the palette. Search for node-red-contrib-XRPL and click install.

After successful installation you will see the XRPL & XRPL Advanced sections added to your node palette.

Now you can begin to interact with the XRPL by dragging and dropping these nodes onto your workspace and wiring them together!

#### Support The Cause  
This tool is provided by <a href="https://xrpi.io" target="_blank">XRP Innovations</a> free of charge with a hope to further support the ecosystem.

We're currently self funded and we're looking for funding to get other exciting XRP projects off the ground, if you could help then <a href="mailto:gazos@xrpi.io">please drop us a line</a> or alternatively if you'd like to buy us a beer then hit us up here:  

<p align="center">
<a href="https://bithomp.com/explorer/rpC3xtJV8fXg4ZzMre3RhMD6ySQeSoXRpi"><img src="https://raw.githubusercontent.com/xrpinnovations/node-red-contrib-xrpl/master/images/rpC3xtJV8fXg4ZzMre3RhMD6ySQeSoXRpi.png" width="200"/></a>
</p>

<p align="center">
XRP Address: <b>rpC3xtJV8fXg4ZzMre3RhMD6ySQeSoXRpi</b>
</p>

<p align="center">
<a href="https://www.patreon.com/xrpi"><img src="https://raw.githubusercontent.com/xrpinnovations/node-red-contrib-xrpl/master/images/patreon.jpg"/></a>
</p>

<p align="center"><b>
#XRPtheStandard  
</b></p>  
<p align="center"><b>
#DareToDream  
</b></p>  

#### About Us & Thanks  
XRP Innovations goal is to support the growth of the blockchain ecosystem.

We are strong believers in distributed ledger technologies and we're so excited to see what's around the corner as this space is moving so quickly.

We'd like to give a big shout out and say thanks to the XRP Community, you truly are inspirational. Let's get creative and build a better, brighter future together.

These are exciting times!

A special thanks to <b>WietseWind and the guys at XRL Labs</b> for the recent support and their awesome tools.

#### Still to do  
* [ ] Test, Test, Test
* [ ] Choose custom servers
* [ ] Check outputs are consistent
* [ ] Add images / videos
* [ ] Add example flows  
* [x] Add node status to receiver node  
* [ ] Tidy up node descriptions  
* [ ] Tidy up icons

#### Legal Notice
This software is provided free of charge and used at your own risk. XRP Innovations cannot be held accountable or responsible for any loss or damage caused by this software.
