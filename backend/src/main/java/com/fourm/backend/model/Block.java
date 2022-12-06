package com.fourm.backend.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
public class Block {
    //Block is a class that represents a user blocking another user
    //This is used to prevent a user from seeing another user's posts, comments, or profile, as well as messaging them
    //This is a many to many relationship, so there is a table that holds the two users that are blocked
    //And blocking is a one way relationship, in the sense that if user A blocks user B, user A can still see user B's posts, comments, and profile
    //But user B cannot see user A's posts, comments, and profile

    @EmbeddedId
    private BlockKey blockKey;

    //I know it's verbose to have a blockKey object, but I'm not sure how to do it without it
    //Encountered the same problem when creating the QuizScore class

    //getters and setters
    public BlockKey getBlockKey() {
        return blockKey;
    }

    public void setBlockKey(BlockKey blockKey) {
        this.blockKey = blockKey;
    }

    public UserPerson getBlocker() {
        return blockKey.getBlocker();
    }

    public void setBlocker(UserPerson blocker) {
        blockKey.setBlocker(blocker);
    }

    public UserPerson getBlocked() {
        return blockKey.getBlocked();
    }

    public void setBlocked(UserPerson blocked) {
        blockKey.setBlocked(blocked);
    }

    public Block() {

    }

    public Block(UserPerson blocker, UserPerson blocked) {
        blockKey = new BlockKey(blocker, blocked);
    }


}
