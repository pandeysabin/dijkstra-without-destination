class PriorityQueue<T> {
  private items: { value: T; priority: number }[] = [];

  enqueue(value: T, priority: number) {
    this.items.push({ value, priority });
    this.sort();
  }

  dequeue() {
    return this.items.shift();
  }

  sort() {
    this.items.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return !this.items.length;
  }

  changePriority(value: T, priority: number) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].value === value) {
        this.items[i].priority = priority;
        this.sort();
        break;
      }
    }
  }
}

class Dijkstra {
  private distances: { [key: string]: number } = {};
  private visited = new Set<string>();
  private queue = new PriorityQueue<string>();

  constructor(
    private graph: { [key: string]: { [key: string]: number } },
    startPoint: string
  ) {
    this.distances[startPoint] = 0;
    this.queue.enqueue(startPoint, this.distances[startPoint]);

    for (const node of Object.keys(graph)) {
      if (node === startPoint) continue;
      this.distances[node] = 1000;
      this.queue.enqueue(node, this.distances[node]);
    }
  }

  shortestPath(
    start: string,
    graph: { [key: string]: { [key: string]: number } }
  ): { [key: string]: number } {
    this.queue.changePriority(start, 0);

    while (!this.queue.isEmpty()) {
      const current = this.queue.dequeue()!.value;
      this.visited.add(current);

      for (const neighbor of Object.keys(this.graph[current])) {
        if (this.visited.has(neighbor)) continue;

        const distance =
          this.distances[current] + this.graph[current][neighbor];
        if (distance < this.distances[neighbor]) {
          this.distances[neighbor] = distance;
          this.queue.enqueue(neighbor, distance);
        }
      }
    }

    return this.distances;
  }
}
