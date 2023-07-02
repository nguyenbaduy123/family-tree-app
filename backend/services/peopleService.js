const _ = require('lodash')
const Joi = require('joi')
const db = require('../config/connection')
const { v4: uuidv4 } = require('uuid')

const updateChildren = async (father_id, mother_id, child_id) => {
  try {
    const husband_id = father_id || mother_id
    const wife_id = mother_id || father_id
    const parentsChildren = await db('parents_children as pc')
      .where('husband_id', husband_id)
      .andWhere('wife_id', wife_id)
      .first()
    if (parentsChildren) {
      const prevChildren = parentsChildren.children || []
      const children = [...prevChildren, child_id]
      await db('parents_children')
        .where('husband_id', husband_id)
        .andWhere('wife_id', wife_id)
        .update({
          children: children,
        })
    } else {
      const children = [child_id]
      await db('parents_children').insert({
        husband_id: husband_id,
        wife_id: wife_id,
        children: children,
      })
    }
  } catch (error) {
    console.error('Update children error: ', error)
  }
}

module.exports = { updateChildren }
