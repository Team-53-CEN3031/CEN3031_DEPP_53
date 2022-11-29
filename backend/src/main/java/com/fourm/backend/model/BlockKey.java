package com.fourm.backend.model;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.util.Objects;

public class BlockKey implements Serializable {
    //blocker_id and blocked_id are foreign keys
    //blocker_id is the user that is blocking another user
    //blocked_id is the user that is being blocked by another user
    //the order matters, since blocking is a one way relationship

    @ManyToOne
    @JoinColumn(name = "blocker_id")
    private UserPerson blocker;

    @ManyToOne
    @JoinColumn(name = "blocked_id")
    private UserPerson blocked;

    public BlockKey() {

    }

    public BlockKey(UserPerson blocker, UserPerson blocked) {
        this.blocker = blocker;
        this.blocked = blocked;
    }

    //Overridden operators are needed for embedded keys
    @Override
    public boolean equals(Object o) {
        //if these two objects are the same in memory, then they are equal
        if (this == o) return true;
        //if these two objects are not the same class, they cannot be equal
        if (o == null || getClass() != o.getClass()) return false;

        BlockKey blockKey = (BlockKey) o;

        //Compares blocker of this object to blocker of other object
        //and then compares blocked of this object to blocked of other object
        if (blocker.getId() != blockKey.blocker.getId()) {
            return false;
        }
        return blocked.getId() == blockKey.blocked.getId();
    }

    @Override
    public int hashCode() {
        //Hashes the blocker and blocked objects
        //Not sure if order matters here
        return Objects.hash(blocker.getId(), blocked.getId());
    }

    public UserPerson getBlocker() {
        return blocker;
    }

    public void setBlocker(UserPerson blocker) {
        this.blocker = blocker;
    }

    public UserPerson getBlocked() {
        return blocked;
    }

    public void setBlocked(UserPerson blocked) {
        this.blocked = blocked;
    }

}
