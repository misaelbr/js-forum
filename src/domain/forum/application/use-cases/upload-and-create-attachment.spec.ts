import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachment'
import { FakeUploader } from 'test/storage/faker-uploader'
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type-error'

let inMemomoryAttachmentsRepository: InMemoryAttachmentsRepository
let fakeUploader: FakeUploader

let sut: UploadAndCreateAttachmentUseCase

describe('Upload and create attachment', () => {
  beforeEach(() => {
    inMemomoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    fakeUploader = new FakeUploader()

    sut = new UploadAndCreateAttachmentUseCase(
      inMemomoryAttachmentsRepository,
      fakeUploader,
    )
  })

  it('should be able upload and create an attachment', async () => {
    const result = await sut.execute({
      fileName: 'any_file_name.jpg',
      fileType: 'image/jpg',
      body: Buffer.from('any_buffer'),
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      attachment: inMemomoryAttachmentsRepository.items[0],
    })
    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'any_file_name.jpg',
      }),
    )
  })

  it('should not be able upload and create an attachment with invalid type', async () => {
    const result = await sut.execute({
      fileName: 'audio.mp3',
      fileType: 'audio/mp3',
      body: Buffer.from('any_buffer'),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError)
  })
})
