const PUBLIC_KEY =
  'BPOtKoIcXFN-aMtMjlG8mvvHOrz9ZRUAuMbFe0mOSFNcBDczfVAdLJhVHFFv9sRzuNA07k07HQ2WnzLxCGWTvMo'

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray
}

const saveSubscription = async (subscription) => {
  // http://localhost:3000
  const response = await fetch('http://192.168.1.50:3000/save-subscription', {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(subscription),
  })

  return response.json()
}

self.addEventListener('activate', async (e) => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
  })

  const response = await saveSubscription(subscription)
  console.log(response)
})

self.addEventListener('push', (e) => {
  self.registration.showNotification('Wohoo!!', { body: e.data.text() })
})
