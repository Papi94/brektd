**bRektd - A CLI interface for Anchor Protocol liquidations**

Summary: bRektd aims to provide users with a simple CLI interface for performing all necessary actions involved in participating in Anchor Protocol liquidations. 

Requirements: NodeJs >v14

Getting Started:

Download this project using git or download the Zip file from github.

Once downloaded open a command prompt window and move the directory to the project folder.  

    cd /path/to/folder

Run: `npm install`

Once dependancies are installed you will need to setup a wallet to be used by the app. There are two ways to do this.

1. You can set an environment variable in the context of your current terminal session using the below commands
Windows:`set MNEMONIC_KEY="your key here"`
Mac/Linux: `export MNEMONIC_KEY="your key here"`


2. Or you can create a file named .env in the project directory , within the .env file you will define your key as such
`MNEMONIC_KEY="your key here"`


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

