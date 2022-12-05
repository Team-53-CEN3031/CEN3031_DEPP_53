package com.fourm.backend.service;

import com.fourm.backend.model.Chat;
import com.fourm.backend.model.UserPerson;

import java.util.List;

public interface ChatService {

    public Chat saveChat(Chat chat);

    public List<Chat> getAllChats();

    public void deleteChat(Chat chat);

    public List<Chat> getChatsInvolvingUser(UserPerson userPerson);
}
