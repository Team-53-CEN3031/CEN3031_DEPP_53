package com.fourm.backend.service;

import com.fourm.backend.model.Block;

import java.util.List;

public interface BlockService {

    public Block saveBlock(Block block);

    public List<Block> getAllBlocks();
}
