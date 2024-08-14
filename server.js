import ollama from 'ollama'
import express from "express";

const app = express();
app.use(express.json());
app.post("/", async (req, res) => {
    const chat  = req.body;
    console.log(chat);
    const response = await invokeLLM(chat);
    
    
    res.json({ response: response });
});

app.listen(3000, console.log("server is running"));

let modelResponse = ""

// let chatConfig = {
//   model: "medllama2",
//   role: "user",
//   content: "Why is the sky blue?"
// }

// const mentalHealthPrompt = "I want you to act as a psychologist. I will talk to you as a public user who might want mental health support. You should use your knowledge of cognitive behavioral therapy, funny behaviour, mindfulness practices, and other therapeutic methods in order to talk to the user to reduce their mental health and provide support and create strategies that the individual can implement in order to improve the user's overall wellbeing.";
const mentalHealthPrompt = "I want you to act as a psychologist and talk with me to reduce mental health illness of mine in upcoming conversation.";

async function invokeLLM(chat) {
  try {
    const response = await ollama.chat({
      model: "medllama2",
    //   messages: chat
      messages: [{ role: "user", content: mentalHealthPrompt}, ...chat]
    
    })
    console.log(`${response.message.content}\n`)
    modelResponse = response.message.content;
    return modelResponse;
  }
  catch(error) {
    console.log(`Query failed!`)
    console.log(error)
  }
}

// invokeLLM(chatConfig)