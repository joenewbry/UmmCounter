import { googleAuthProvider } from '@/firebase'
import { getAuth, signInWithPopup } from 'firebase/auth'

const SignInButton = (): JSX.Element => {
  const handleSignIn = async () => {
    const auth = getAuth()
    try {
      const result = await signInWithPopup(auth, googleAuthProvider)
      const { user } = result
      console.log(user)
    } catch (e) {
      console.error(e)
    }

    // IdP data available in result.additionalUserInfo.profile.
    // // generating uuid
    // const uuid = v4()

    // // grabbing reference to the firebase realtime db document for the uuid
    // const uuidRef = ref(storage, `onetime-uuids/${uuid}`)

    // // applying listener to the reference document

    // onValue(uuidRef, async snapshot => {
    //   const authToken = snapshot.val()
    //   const auth = getAuth()

    //   const credential = signInWithCustomToken(auth, authToken)
    // })

    // // invoking main process method to open user's default browser
    // window.electronApi.ipcRenderer.invoke('initiate-login', uuid)
  }

  return (
    <div>
      <button onClick={handleSignIn}>Initiate Google Sign In</button>
    </div>
  )
}
export default SignInButton
