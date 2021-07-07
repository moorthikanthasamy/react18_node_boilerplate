
const deviceDetector = headers => {
   const MobileDetect = require('mobile-detect');
   const userAgent = headers['user-agent'];
   const md = new MobileDetect(userAgent);
   let deviceType = null
   if (md.phone()) {
      deviceType = 'mobile';
   } else if (md.tablet()) {
      deviceType = 'tablet';
   } else {
      deviceType = 'desktop';
   }
   return deviceType;
}
export default deviceDetector;