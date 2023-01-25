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

const graph = {
  eR05DMkp5raWbSCuTf9o26op6OD3: {
    zeeO9TubtbUWYScBYeiPHMM32K72: 0.0,
    "3bd4403d-3df6-c0ad-4ff9-2504af9a8f74": 3.0,
    "b6132fef-963d-002b-4036-47da0b59fe5b": 0.0,
    "f5119699-5ed1-039f-da84-c6f8f0db76e0": 2.0,
    "843e8308-da76-bc7f-4ba0-eb8dd4fa5643": 9547.0,
  },
  zeeO9TubtbUWYScBYeiPHMM32K72: {
    "3bd4403d-3df6-c0ad-4ff9-2504af9a8f74": 3.0,
    "b6132fef-963d-002b-4036-47da0b59fe5b": 0.0,
    "f5119699-5ed1-039f-da84-c6f8f0db76e0": 2.0,
    "843e8308-da76-bc7f-4ba0-eb8dd4fa5643": 9547.0,
  },
  "3bd4403d-3df6-c0ad-4ff9-2504af9a8f74": {
    "b6132fef-963d-002b-4036-47da0b59fe5b": 3.0,
    "f5119699-5ed1-039f-da84-c6f8f0db76e0": 2.0,
    "843e8308-da76-bc7f-4ba0-eb8dd4fa5643": 9551.0,
  },
  "b6132fef-963d-002b-4036-47da0b59fe5b": {
    "f5119699-5ed1-039f-da84-c6f8f0db76e0": 2.0,
    "843e8308-da76-bc7f-4ba0-eb8dd4fa5643": 9547.0,
  },
  "f5119699-5ed1-039f-da84-c6f8f0db76e0": {
    "843e8308-da76-bc7f-4ba0-eb8dd4fa5643": 9549.0,
  },
  "843e8308-da76-bc7f-4ba0-eb8dd4fa5643": {
    "843e8308-da76-bc7f-4ba0-eb8dd4fa5643": 0.0,
  },
};

const dijkstra = new Dijkstra(graph, "eR05DMkp5raWbSCuTf9o26op6OD3");

console.log(dijkstra.shortestPath("eR05DMkp5raWbSCuTf9o26op6OD3", graph));
