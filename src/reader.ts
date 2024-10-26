import { PacketType, type Packet } from "./types";

export class PacketReader {
  static Parse(data: Buffer): Packet[] {
    const packets: Packet[] = [];
    let position = 0;

    while (position < data.length) {
      const packet = this.ReadPacket(data, position);
      packets.push(packet.packet);
      position += packet.length;
    }

    return packets;
  }

  static ReadPacket(
    buffer: Buffer,
    position: number
  ): { packet: Packet; length: number } {
    const type = buffer.readInt16LE(position);
    position += 2;

    buffer.readUInt8(position);
    position += 1;

    const length = buffer.readInt32LE(position);
    position += 4;

    const data = buffer.subarray(position, position + length);
    position += length;

    const packetName = PacketType[type];

    const packet: Packet = {
      type: type as PacketType,
      packetName,
      data: data,
    };

    return { packet, length: position - (position - length - 7) };
  }
}
