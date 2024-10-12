import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from 'qrcode-terminal';

class WhatsAppWeb {
  private client: Client;
  private isClientReady: boolean;

  constructor() {
    try {
      this.isClientReady = false;

      this.client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: { 
          // headless: false,
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }
      });
  
      console.log('WHATSAPP CLIENT INITIALIZE.')
      this.client.initialize();
  
      this.client.on('qr', async (qr) => {
        qrcode.generate(qr, { small: true });
        console.log('SCAN QR FOR LINK WITH WHATSAPP DEVICE!!!');
      });
  
      this.client.on('authenticated', () => {
        console.log('WHATSAPP AUTHENTICATED!');
      });
    
      this.client.on('auth_failure', msg => {
        // Fired if session restore was unsuccessful
        this.isClientReady = false;
        console.error('WHATSAPP AUTHENTICATION FAILURE!', msg);
      });
    
      this.client.on('disconnected', (reason: string) => {
        console.log(`Client was disconnected: ${reason}`);
        this.handleLogout();
      });

      this.client.on('ready', async () => {
        this.isClientReady = true;

        console.log('WHATSAPP READY!');
        const debugWWebVersion = await this.client.getWWebVersion();
        console.log(`WWebVersion = ${debugWWebVersion}`);
    
        this.client.pupPage?.on('pageerror', function(err) {
            console.log('WHATSAPP Page error: ' + err.toString());
        });
        this.client.pupPage?.on('error', function(err) {
            console.log('WHATSAPP Page error: ' + err.toString());
        });
      });
    } catch (err: any) {
      this.isClientReady = false;
      console.log(`WHATSAPP CLIENT ERROR: ${err}`);
    }
  }

  private handleLogout(): void {
    console.log('WHATSAPP Handling logout... Cleaning up session.');
    this.restartClient();
  }

  private restartClient(): void {
    console.log('Restarting WhatsApp Client...');
    this.client.initialize();
  }

  public async sendMessage(to: string, message: string) {
    if (this.isClientReady) {
      const chatId = `${to}@c.us`;
      await this.client.sendMessage(chatId, message);
      console.log(`WHATSAPP Message sent to ${to}: ${message}`);
    }
  }
}

export default new WhatsAppWeb();