import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FriendListItem from './components/profileBar';
import Heading from './components/heading';
import { useState } from 'react';
import Profile from './components/profile';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
const userData = require('./tempDB.json');

export default function App() {
  const [page, setPage] = useState(true);
  const [recording, setRecording] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [isSilent, setIsSilent] = useState(false);
  //console.log(getLatestLine())
    console.log("test")
  useEffect(() => {
    startRecording();
  });

  useEffect(() => {
    if (isSilent && recording) {
      stopRecordingAndSendData();
    }
  }, [isSilent]);

  const startRecording = async () => {
    const recordingInstance = new Audio.Recording();
    try {
      await recordingInstance.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recordingInstance.startAsync();

      // Start a function to monitor the amplitude (to detect silence)
      monitorAmplitude(recordingInstance);

      setRecording(recordingInstance);
    } catch (error) {
      // Handle error
    }
  };

  const monitorAmplitude = async (recordingInstance) => {
    const intervalId = setInterval(async () => {
      try {
        const status = await recordingInstance.getStatusAsync();
        if (status.isRecording && status.isMeteringEnabled) {
          if (status.metering.averagePower < -30) { // Adjust this threshold as necessary
            setIsSilent(true);
          } else {
            setIsSilent(false);
          }
        }
      } catch (error) {
        // Handle error
      }
    }, 10000); // Adjust interval as necessary

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  };

  const stopRecordingAndSendData = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const audioData = (await recording.getURI()); // Read the file into a format suitable for sending via HTTP

      // Now send audioData to your server for transcription
      const response = await fetch('http://localhost:3000/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ audioData }),
      });
      const result = await response.json();
      setTranscription(result.text); // Assuming your server sends back a JSON object with a "text" property

      // Reset the recording instance and silence detection
      setRecording(null);
      setIsSilent(false);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <View>
        <Heading/>
        {page ?         
          <View>
            {Object.keys(userData["users"]).map(user => (
              
                <FriendListItem 
                    key={user}
                    name={user} 
                    location={userData["users"][user]["location"]} 
                    setPage = {setPage}/>
            ))}
          </View>
        : <View>
            <Profile/>
            <Text>Person1 was encountered at the park</Text>
            <Text>{"<More details about person1>"}</Text>
          </View>
        }
    </View>
  );
}
const getLatestLine = async () => {
  try {
    const fileUri = `${FileSystem.documentDirectory}services/transcribedSpeech.txt`; 
    ensureDirExists(`${FileSystem.documentDirectory}services/`);
    const fileContent = await FileSystem.readAsStringAsync(fileUri);
    const lines = fileContent.split('\n');
    const lastLine = lines[lines.length - 1];
    return lastLine.substring(indexOf(':')+2);
  } catch (error) {
    console.error('Error reading file:', error);
    return 'Error reading file';
  }
}

async function ensureDirExists(dir) {
  const dirInfo = await FileSystem.getInfoAsync(dir);
  console.log(dirInfo);
  if (!dirInfo.exists) {
    console.log("directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
