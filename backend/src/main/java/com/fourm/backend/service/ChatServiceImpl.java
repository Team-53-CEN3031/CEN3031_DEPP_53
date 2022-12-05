package com.fourm.backend.service;

import com.fourm.backend.model.Chat;
import com.fourm.backend.model.UserPerson;
import com.fourm.backend.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {
    private ChatRepository chatRepository;

    @Autowired
    public void setChatRepository(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }


    @Override
    public Chat saveChat(Chat chat) {
        return chatRepository.save(chat);
    }

    @Override
    public List<Chat> getAllChats() {
        return chatRepository.findAll();
    }

    @Override
    public void deleteChat(Chat chat) {
        chatRepository.delete(chat);
    }

    @Override
    public List<Chat> getChatsInvolvingUser(UserPerson userPerson) {
        return chatRepository.findBySenderOrReceiver(userPerson);
    }
}
