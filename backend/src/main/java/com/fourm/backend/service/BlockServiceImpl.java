package com.fourm.backend.service;

import com.fourm.backend.model.Block;
import com.fourm.backend.repository.BlockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlockServiceImpl implements BlockService {
    private BlockRepository blockRepository;

    @Autowired
    public void setBlockRepository(BlockRepository blockRepository) {
        this.blockRepository = blockRepository;
    }

    @Override
    public Block saveBlock(Block block) {
        return blockRepository.save(block);
    }

    @Override
    public List<Block> getAllBlocks() {
        return blockRepository.findAll();
    }

}
