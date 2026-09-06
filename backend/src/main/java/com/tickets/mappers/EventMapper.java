package com.tickets.mappers;

import com.tickets.domain.CreateEventRequest;
import com.tickets.domain.CreateTicketTypeRequest;
import com.tickets.domain.UpdateEventRequest;
import com.tickets.domain.UpdateTicketTypeRequest;
import com.tickets.domain.dtos.CreateEventRequestDto;
import com.tickets.domain.dtos.CreateEventResponseDto;
import com.tickets.domain.dtos.CreateTicketTypeRequestDto;
import com.tickets.domain.dtos.GetEventDetailsResponseDto;
import com.tickets.domain.dtos.GetEventDetailsTicketTypesResponseDto;
import com.tickets.domain.dtos.GetPublishedEventDetailsResponseDto;
import com.tickets.domain.dtos.GetPublishedEventDetailsTicketTypesResponseDto;
import com.tickets.domain.dtos.ListEventResponseDto;
import com.tickets.domain.dtos.ListEventTicketTypeResponseDto;
import com.tickets.domain.dtos.ListPublishedEventResponseDto;
import com.tickets.domain.dtos.UpdateEventRequestDto;
import com.tickets.domain.dtos.UpdateEventResponseDto;
import com.tickets.domain.dtos.UpdateTicketTypeRequestDto;
import com.tickets.domain.dtos.UpdateTicketTypeResponseDto;
import com.tickets.domain.entities.Event;
import com.tickets.domain.entities.TicketType;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EventMapper {

  CreateTicketTypeRequest fromDto(CreateTicketTypeRequestDto dto);

  CreateEventRequest fromDto(CreateEventRequestDto dto);

  CreateEventResponseDto toDto(Event event);

  ListEventTicketTypeResponseDto toDto(TicketType ticketType);

  ListEventResponseDto toListEventResponseDto(Event event);

  GetEventDetailsTicketTypesResponseDto toGetEventDetailsTicketTypesResponseDto(
      TicketType ticketType);

  GetEventDetailsResponseDto toGetEventDetailsResponseDto(Event event);

  UpdateTicketTypeRequest fromDto(UpdateTicketTypeRequestDto dto);

  UpdateEventRequest fromDto(UpdateEventRequestDto dto);

  UpdateTicketTypeResponseDto toUpdateTicketTypeResponseDto(TicketType ticketType);

  UpdateEventResponseDto toUpdateEventResponseDto(Event event);

  ListPublishedEventResponseDto toListPublishedEventResponseDto(Event event);

  GetPublishedEventDetailsTicketTypesResponseDto toGetPublishedEventDetailsTicketTypesResponseDto(
      TicketType ticketType);

  GetPublishedEventDetailsResponseDto toGetPublishedEventDetailsResponseDto(Event event);
}
