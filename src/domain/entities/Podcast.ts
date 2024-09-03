export class Podcast {
  constructor(
    public id: string,
    public title: string,
    public author: string,
    public description: string,
    public imageUrl: string,
    public episodes?: Episode[],
  ) {}
}

export class Episode {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public audioUrl: string,
    public duration: string,
  ) {}
}
