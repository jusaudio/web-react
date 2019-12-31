import F from '../utils/firebase';

export async function getAudioDetails(vidId: string) {
  const ref = F.rtdb.ref(`audioMappings/${vidId}`);
  const snapshot = await ref.once('value');
  // console.log('values >> ', snapshot.val());
  return snapshot.val();
}
