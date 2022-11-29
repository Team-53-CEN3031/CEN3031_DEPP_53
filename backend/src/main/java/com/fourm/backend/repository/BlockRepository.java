package com.fourm.backend.repository;

import com.fourm.backend.model.Block;
import com.fourm.backend.model.BlockKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlockRepository extends JpaRepository<Block,BlockKey> {
}
