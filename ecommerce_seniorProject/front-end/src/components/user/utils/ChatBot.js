import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";

const getProducts = async (attrs) => {
  const url = `/api/products/?category=Computers&attrs=RAM-${attrs}`;
  const { data } = await axios.get(url);
  return data;
};

const ChatBotMsg = ({ setIsChatbot, chat, setChat, socket }) => {
  const [suggestedProducts, setSuggestedProducts] = useState();
  const chatbotMsg = [
    " Hello, what are you looking for?",
    " What is your field of work?(gaming, designer, coding, daily stuff)",
    " Please just give me few minutes and I will be back!",
  ];
  useEffect(() => {
    setChat((chat) => {
      return [...chat, { admin: chatbotMsg[0] }];
    });
    // eslint-disable-next-line
  }, []);

  const clientSubmitChatMsg = (e) => {
    if (e.keyCode && e.keyCode !== 13) {
      return;
    }
    const msg = document.getElementById("clientChatMsg");
    let v = msg.value.trim();
    if (v === "" || v === null || v === false || !v) {
      return;
    }
    socket.emit("client sends message", v);
    setChat((chat) => {
      return [...chat, { client: v }];
    });

    msg.focus();
    setTimeout(() => {
      msg.value = "";
      const chatMessages = document.querySelector(".chat-msg");
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 200);
    let answer = v.split(" ");
    if (answer.indexOf("computer") !== -1 || answer.indexOf("laptop") !== -1) {
      setChat((chat) => {
        return [...chat, { admin: chatbotMsg[1] }];
      });
    } else if (
      answer.indexOf("development") !== -1 ||
      answer.indexOf("gaming") !== -1 ||
      answer.indexOf("designer") !== -1
    ) {
      getProducts("16 GB")
        .then((product) => {
          setSuggestedProducts(product.products);
        })
        .catch((er) => console.log(er));
      setChat((chat) => {
        return [...chat, { admin: "This is a list of suggested products: " }];
      });
    } else if (answer.indexOf("daily") !== -1) {
      getProducts("8 GB")
        .then((product) => {
          setSuggestedProducts(product.products);
        })
        .catch((er) => console.log(er));
      setChat((chat) => {
        return [...chat, { admin: "This is a list of suggested products: " }];
      });
    } else {
      setChat((chat) => {
        return [...chat, { admin: chatbotMsg[2] }];
      });
      socket.emit("client sends message", "Admin need");
      setIsChatbot(false);
    }
  };

  const linkStyle = {
    color: "white",
  };

  return (
    <div className="chat-form">
      <div className="chat-msg">
        {chat.map((item, id) => {
          return (
            <div key={id}>
              {item.admin && (
                <p className="bg-primary p-3 ms-4 text-light rounded">
                  <b>Support wrote:</b>
                  {item.admin}
                  {item.admin === "This is a list of suggested products: " &&
                    suggestedProducts &&
                    suggestedProducts.map((product, id) => {
                      return (
                        <a
                          key={id}
                          href={`/product-details/${product._id}`}
                          style={linkStyle}
                        >
                          <br />
                          {id + 1}-{product.name}
                        </a>
                      );
                    })}
                </p>
              )}
              {item.client && (
                <p>
                  <b>You wrote: </b>
                  {item.client}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <textarea
        onKeyUp={(e) => {
          clientSubmitChatMsg(e);
        }}
        id="clientChatMsg"
        placeholder="Your Text Message"
        className="form-control"
      ></textarea>
      <button className="btn btn-success btn-block">Submit</button>
    </div>
  );
};

export default ChatBotMsg;
