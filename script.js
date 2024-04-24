const checkPermission = () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('No support for service worker!')
  }

  if (!('Notification' in window)) {
    throw new Error('No support for notification API')
  }

  if (!('PushManager' in window)) {
    throw new Error('No support for Push API')
  }
}

const registerSW = async () => {
  const registration = await navigator.serviceWorker.register(
    'service-worker.js'
  )
  return registration
}

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission()

  if (permission !== 'granted') {
    throw new Error('Notification permission not granted')
  }
}

const main = async () => {
  checkPermission()
  await requestNotificationPermission()
  await registerSW()
}

// A $( document ).ready( ) block.
$(document).ready(async function () {
  $('.testBtn').on('click', () => {
    console.log('handle click btn');
    console.log(OneSignal.User.PushSubscription.id);
    console.log(OneSignal.User.PushSubscription.token);
  })
  
  // window.screen.
  // screen.orientation
  //   .lock('natural')
  //   .then((r) => alert(r))
  //   .catch((e) => alert(e))

  // alert(typeof screen.orientation.lock)
  // screen.lockOrientation("orientation");
  // screen.lockOrientationUniversal =
  //   screen.lockOrientation ||
  //   screen.mozLockOrientation ||
  //   screen.msLockOrientation

  // checkPermission()
  // console.log(Notification);
  // Notification.requestPermission()

  // 2
  // let orn = getOrientation()
  // let out = document.getElementById('output')
  // out.textContent = orn

  // function getOrientation() {
  //   let _orn =
  //     screen.msOrientation || (screen.orientation || screen.mozOrientation).type

  //   switch (_orn) {
  //     case 'portrait-primary':
  //     case 'portrait-secondary':
  //       break
  //     case 'landscape-primary':
  //       console.log('This is the laptop/desktop version')
  //       break
  //     case 'landscape-secondary':
  //       break
  //     case undefined:
  //       //not supported
  //       break
  //     default:
  //     //something unknown
  //   }
  //   return _orn
  // }

  // window.addEventListener('orientationchange', (ev) => {
  //   orn = getOrientation()
  //   out.textContent = orn
  //   console.dir(ev)
  //   alert(screen.msOrientation || (screen.orientation || screen.mozOrientation).type)
  // })

  // screen.orientation.addEventListener("change", (e) => {
  //   // console.log(e);
  //   // orn = getOrientation()
  //   // out.textContent = orn
  //   alert(screen.msOrientation || (screen.orientation || screen.mozOrientation).type)
  // });
})
