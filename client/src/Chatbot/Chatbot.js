import Axios from "axios";
import React from "react";

function Chatbot() {
  const textQuery = async (text) => {
    // let converstaions = [];

    //I sent
    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
    };

    // conversations.push(converstaion);

    //Chatbot sent

    const textQueryVariable = {
      text,
    };

    try {
      //I will send request to the text Query ROUTE

      const response = await Axios.post(
        "/api/dialogflow/textQuery",
        textQueryVariable
      );
      const content = response.data.fulfillmentMessages[0];

      conversation = {
        who: "bot",
        content: content,
      };
      // conversations.push(converstaion);
      console.log(conversation);
    } catch (error) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: "Error just occured, please check the problem",
          },
        },
      };
      console.log(conversation);
      // conversations.push(converstaion);
    }
  };

  const keyPressHanlder = (e) => {
    if (e.key === "Enter") {
      if (!e.target.value) {
        return alert("you need to type something first");
      }

      textQuery(e.target.value);

      e.target.value = "";
    }
  };

  return (
    <div
      style={{
        height: 700,
        width: 700,
        border: "3px solid black",
        borderRadius: "7px",
      }}
    >
      <div style={{ height: 644, width: "100%", overflow: "auto" }}>
        {" "}
        conversations
      </div>

      <input
        style={{
          margin: 0,
          width: "100%",
          height: 50,
          borderRadius: "4px",
          padding: "5px",
          fontSize: "1rem",
        }}
        placeholder="Send a message..."
        onKeyPress={keyPressHanlder}
        type="text"
      />
    </div>
  );
}

export default Chatbot;
