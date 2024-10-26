import { OsuReader } from "osu-buffer"; //TODO: own implementation
import { PacketType, type PacketHandlerEvents } from "./types";
import { EventEmitter } from "./eventemitter";
import { PacketReader } from "./reader";

export class PacketHandler extends EventEmitter<PacketHandlerEvents> {
  constructor() {
    super();
  }

  Receive(response: Buffer) {
    const packets = PacketReader.Parse(response);
    for (let packet of packets) {
      let data;
      let buffer = new OsuReader(
        new Uint8Array(packet.data).buffer as ArrayBuffer
      );
      switch (packet.type) {
        //TODO: rest packets
        case PacketType.ServerUserData:
          data = {
            userId: buffer.readInt32(),
            status: buffer.readBytes(1)[0],
            statusText: buffer.readString(),
            beatmapChecksum: buffer.readString(),
            currentMods: buffer.readUint32(),
            playMode: buffer.readBytes(1)[0],
            beatmapId: buffer.readInt32(),
            rankedScore: buffer.readInt64(),
            accuracy: buffer.readFloat(),
            playCount: buffer.readInt32(),
            totalScore: buffer.readInt64(),
            rank: buffer.readInt32(),
            performance: buffer.readInt16(),
          };
          this.emit("ServerUserData", data); //TODO: just this.emit(packet.packetName, data); after the switch statement?
          break;
        case PacketType.ServerChatMessage:
          data = {
            from: buffer.readString() as string,
            content: buffer.readString() as string,
          };
          this.emit("ServerChatMessage", data);
          break;
        case PacketType.ServerNotification:
          data = {
            content: buffer.readString() as string,
          };
          this.emit("ServerNotification", data);
          break;
      }
    }
  }
}
