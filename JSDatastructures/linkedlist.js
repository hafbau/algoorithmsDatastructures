class Node {
  constructor(data) {
    this.data = data;
    this.next_node = null
  }
}

class LinkedList{

  constructor(head_data = null) {
    this.head = new Node(head_data);
    // this.current = head
    this.tail = this.head
  }

  length() {
    return this.len(this.head)
  }
  // alias_method :size, :length
  // alias_method :lenght, :length
  // alias_method :count, :length

  swap_nodes(data1, data2) {
    [prev_node1, node1] = this.prev_n_current_nodes(data1);
    [prev_node2, node2] = this.prev_n_current_nodes(data2);
    
    if(!(node1 && node2)) {
       return ("Out of range")
    }

    this.test_if_head_then_swap(prev_node1, node2);
    this.test_if_head_then_swap(prev_node2, node1);
    let temp = node2.next_node;
    node2.next_node = node1.next_node;
    node1.next_node = temp;
    }
  
 // Delete the first node with data
  delete(data) {
    this.deleting(this.prev_n_current_nodes(data));
    return data
  }

  delete_all(data) {
    while(this.detect(data)) {
      this.delete(data)
    }
    return data
  }

  delete_at(pos) {
    let prev_node = this.node_at(pos - 1), curr_node;
    prev_node && (curr_node = prev_node.next_node);
    this.deleting([prev_node, curr_node]);
    return curr_node.data
  }

  is_empty_list() {
    return !this.head.data
  }

  append(data) {
    let new_node = new Node(data);
    this.head.data ? this.tail.next_node = new_node : this.head = new_node;
    this.tail = new_node
  }

  // alias_method :<<, :append

  prepend(data) {
    let new_node = new Node(data);
    new_node.next_node = this.head;
    this.head = new_node
  }

  // index (idx) here starts from zero, with the head at index zero
  insert_after(idx, data) {
    let curr_node = this.node_at(idx);
    if(!curr_node) {
      return "Out of range"
    }
    let new_node = new Node(data);
    new_node.next_node = curr_node.next_node;
    curr_node.next_node = new_node
  }

  toString() {
    let curr_node = this.head, str = "";
    while(curr_node) {
      str += curr_node.data + "=>";
      curr_node = curr_node.next_node
    }
    return str + "null"
  }
  // * each(curr_node = head, &block)
  //   return to_enum(:each) unless block_given?

  //   while curr_node && curr_node.data
  //     yield(curr_node)
  //     curr_node = curr_node.next_node
  //   end
  // end

  // alias_method :traverse, :each

  // def to_a
  //   all_nodes.map {|node| node.data }
  // end

  // private

  len(node) {
    if(node) {
      return 1 + (+this.len(node.next_node))
    }
  }

  prev_n_current_nodes(data) {
    let curr_node = this.head;
    while(curr_node && curr_node.data !== data) {
      var prev_node = curr_node;
      curr_node = curr_node.next_node
    }
    return [prev_node, curr_node]
  }

  test_if_head_then_swap(prev, node) {
    prev ? prev.next_node = node : this.head = node
  }

  node_at(index) {
    let curr_node = this.head;
    for(var i = 0; i < index; i++) {
      curr_node && (curr_node = curr_node.next_node)
    }
    return curr_node
  }

  detect(data) {
    return this.prev_n_current_nodes(data)[1]
  }
  // alias_method :detect, :first_node_with
  // alias_method :find, :first_node_with
  // alias_method :node_with, :first_node_with

  node_before_node_with(data) {
    return this.prev_n_current_nodes(data)[0]
  }
  // alias_method :detect_prev, :node_before_node_with
  // alias_method :find_prev, :node_before_node_with

  deleting(prev_n_curr_arry) {
    let prev_node = prev_n_curr_arry[0],
        curr_node = prev_n_curr_arry[1];
    if(!curr_node) {
      return "Out of range"
    }
    
    prev_node && (prev_node.next_node = curr_node.next_node);
    curr_node === this.head && (this.head = this.head.next_node)
  }

  // def all_nodes
  //   all_nodes_ary = []
  //   self.each do |node|
  //     break if all_nodes_ary.include? node
  //     all_nodes_ary.push node
  //   end

  //   all_nodes_ary
  // end

}

class StackList {
  constructor(capacity) {
    this.capacity = capacity;
    this.container = new LinkedList();
    this.size = 0
  }

  push(data) {
    if(this.isFull()) {
      return "Stack Overflow"
    }
    this.append(data);
    this.size++
  }

  pop() {
    if(this.isEmpty()) {
      return "Stack Underflow"
    }
    return this.container.delete_at(--this.size)
  }

  isFull() {
    return this.size === this.capacity
  }

  isEmpty() {
    return !this.container.head.data
  }
}

class QueueList {
  constructor(capacity) {
    this.capacity = capacity;
    this.container = new LinkedList()
  }

  enqueue(data) {
    if(this.isFull()) {
      return "Queue Overflow"
    }
    this.append(data)
  }

  dequeue() {
    if(this.isEmpty()) {
      return "Queue Underflow"
    }
    this.size--;
    return this.container.delete_at(0)
  }

  isFull() {
    return this.size === this.capacity
  }

  isEmpty() {
    return !this.container.head.data
  }
}