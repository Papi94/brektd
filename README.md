**bRektd - A CLI interface for Anchor Protocol liquidations**

Summary: bRektd aims to provide users with a simple CLI interface for performing all necessary actions involved in participating in Anchor Protocol liquidations. 

Requirements: NodeJs >v14

Getting Started:

Download this project using git or download the Zip file from github.

Once downloaded open a command prompt window and move the directory to the project folder.  

    cd /path/to/folder

Run: `npm install`

Once dependancies are installed you will need to setup a wallet to be used by the app. 

Run the following command to encrypt your private key and store it to a file:

`node brektd.js --setup-keys --private-key "your private key" --password "your password" `

The password is read at run time from the PASSWORD environment variable. You will need to set this in your current terminal session every time. To do this enter:

`set PASSWORD="yourpassword"` on windows

OR 

`export PASSWORD="yourpassword"` on mac or linux

You will need to define PASSWORD each time you open a new terminal
 
Once that is done you are ready to start using the CLI interface.

Current supported assets: bluna, beth

--premium is used to define the premium slot in which the bid is placed, 1 =1%, 2=2% etc

Run `node brektd.js` to display the cli documentation

Place a bid:

--place-bid --asset bluna|beth --amount amount_to_bid --premium liquidation_premium

Example: 

     brektd.js --place-bid --asset bluna --amount 10 --premium 2

Activate pending bids after 10 minute wait:

--activate-all-bids --asset bluna|beth

Example: 

    brektd.js --activate-all-bids --asset bluna

Cancel all liquidation bids:

--withdraw-all-bids --asset bluna|beth

Example: 

    brektd.js --withdraw-all-bids --asset bluna

Withdraw a single bid:

--withdraw-single-bid --bid-id

Example: 

    brektd.js --withdraw-single-bid --bid-id 69420

List all active bids for your wallet:

--list-bids

Example: 

    brektd.js --list-bids --asset bluna

View the current premium slots:

--list-queues

Example: 

    brektd.js --list-queues --asset bluna

Claim proceeds from liquidations:

--claim-proceeds --asset bluna

Example: 

    brektd.js --claim-proceeds --asset bluna









THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

