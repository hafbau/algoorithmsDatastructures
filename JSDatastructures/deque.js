class Deque {
  constructor(n) {
    this.capacity = n;
    this.arr = [];
    this.head = -1;
    this.tail = -1;
  }

  fold(idx) {
    if(idx < 0) {
      return this.capacity - 1;
    }
    if(idx >= this.capacity) {
      return 0;
    }
    return idx;
  }

  isFull() {
    return this.fold(this.tail + 1) === this.head;
  }

  isEmpty() {
    return this.head === -1 && this.tail === -1;
  }

  insert_tail(val) {
    if(this.isFull()) { return; }

    if(this.isEmpty()) {
      this.arr[0] = val;
      [this.head, this.tail] = [0,0];
      return;
    }
    this.tail = this.fold(this.tail + 1)
    this.arr[this.tail] = val;
  }

  insert_head(val) {
    if(this.isFull()) { return; }

    if(this.isEmpty()) {
      this.arr[0] = val;
      [this.head, this.tail] = [0,0];
      return;
    }
    this.head = this.fold(this.head - 1);
    this.arr[this.head] = val;
  }

  delete_tail() {
    if(this.isEmpty()) {return;}
    deleted = this.arr[this.tail];

    if(this.head === this.tail) {
      [this.head, this.tail] = [-1,-1];
    } else { this.tail-- }
    return deleted;
  }

  delete_head() {
    if(this.isEmpty()) {return;}
    deleted = this.arr[this.head];

    if(this.head === this.tail) {
      [this.head, this.tail] = [-1,-1];
    } else { this.head++ }
    return deleted;
  }
}