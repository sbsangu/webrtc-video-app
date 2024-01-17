class PeerService{

 constructor(){
  if(!this.peer){
   this.peer=new RTCPeerConnection({
    iceServers :[
     { urls: 'stun:stun.l.google.com:19302' }, // Google's public STUN server
     { 
       urls: 'stun:global.stun.twilio.com:3478', // Your TURN server
       
     }
   ]
   })
  }

 }

 async getOffer(){
  if(this.peer){
   const offer = await this.peer.createOffer();
   await this.peer.setLocalDescription(new RTCSessionDescription(offer));
   return offer;
  }
 }

 async getAnswer(offer){
  if(this.peer){
    await this.peer.setRemoteDescription(offer);

    const ans= await this.peer.getAnswer();

    await this.peer.setLocalDescription(new RTCSessionDescription(ans));
   return ans;
  }
 }


 async setLocalDescription(ans){
  if(this.peer){
    await this.peer.setRemoteDescription(new RTCSessionDescription(ans))
  }
 }
}

export default new PeerService();