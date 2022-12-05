package com.fourm.backend.model;

import javax.persistence.*;
import java.sql.Timestamp;

//Entity signifies that this is a table in the database
@Entity
public class Chat {
    //Id signifies that this is the primary key
    //GeneratedValue signifies that this is auto generated
    //Column signifies that this is a column in the table
    //name signifies the name of the column
    //I chose use generated ID over a composite key because it is easier to implement
    //and this is not a high priority function of the website
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private int chatId;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private UserPerson sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private UserPerson receiver;

    @Column(name = "chat_message")
    private String chatMessage;

    @Column(name = "chat_time")
    private Timestamp chatTime;

    public Chat() {

    }

    public Chat(UserPerson sender, UserPerson receiver, String chatMessage) {
        this.sender = sender;
        this.receiver = receiver;
        this.chatMessage = chatMessage;
        chatTime = new Timestamp(System.currentTimeMillis());
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public UserPerson getSender() {
        return sender;
    }

    public void setSender(UserPerson sender) {
        this.sender = sender;
    }

    public UserPerson getReceiver() {
        return receiver;
    }

    public void setReceiver(UserPerson receiver) {
        this.receiver = receiver;
    }

    public String getChatMessage() {
        return chatMessage;
    }

    public void setChatMessage(String chatMessage) {
        this.chatMessage = chatMessage;
    }

    public Timestamp getChatTime() {
        return chatTime;
    }

    public void setChatTime(Timestamp chatTime) {
        this.chatTime = chatTime;
    }


}
